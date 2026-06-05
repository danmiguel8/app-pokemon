import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environnements/environnement';
import { from, map, Observable } from 'rxjs';
import { Chasseur } from './pokemons/donnees/chasseurs.model';


@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  addChasseur(chasseur: Omit<Chasseur, 'id'>): Observable<Chasseur> {
    return from(
      this.supabase.from('chasseurs').insert({
          nom: chasseur.nom,
          prenom: chasseur.prenom,
          email: chasseur.email,
          isActive: chasseur.isActive,
        })
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as Chasseur;
      })
    );
  }

  getChasseurByEmail(email: string): Observable<Chasseur | null> {
    return from(
      this.supabase.from('chasseurs').select('*').eq('email', email).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) return null;
        return data as Chasseur;
      })
    );
  }
}
