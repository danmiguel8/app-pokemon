import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private supabase: SupabaseService) {}

  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.supabase.getSession();
    return !!data.session;
  }

  async logout() {
    await this.supabase.signOut();
  }
  
}
