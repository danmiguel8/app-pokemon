import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AuthComponent {
  activeTab: 'register' | 'login' = 'register';
  loading = false;
  errorMessage = '';

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        nom:             ['', Validators.required],
        prenom:          ['', Validators.required],
        email:           ['', [Validators.required, Validators.email]],
        password:        ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const pw  = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { nom, prenom, email, password } = this.registerForm.value;

    try {
      const { error: authError } = await this.supabase.signUp(email, password);
      if (authError) throw new Error(authError.message);

      // 2. Insérer dans la table chasseurs
      await new Promise<void>((resolve, reject) => {
        this.supabase.addChasseur({ nom, prenom, email, isActive: true }).subscribe({
          next: () => resolve(),
          error: (err) => reject(err),
        });
      });

      this.activeTab = 'login';
      this.registerForm.reset();
      alert('Compte créé ! Vous pouvez vous connecter.');

    } catch (err: any) {
      this.errorMessage = err.message ?? 'Une erreur est survenue.';
    } finally {
      this.loading = false;
    }
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;
    try {
      const { error } = await this.supabase.signIn(email, password);
      if (error) throw new Error(error.message);
      await this.router.navigate(['/pokemon/all']);
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.loading = false;
    }
  }

  switchTab(tab: 'register' | 'login') {
    this.activeTab = tab;
    this.errorMessage = '';
  }



}
