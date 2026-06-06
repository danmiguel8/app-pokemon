// src/app/animations.ts
import { animate, animation, keyframes, style, trigger, transition, query, stagger, useAnimation } from '@angular/animations';

export const fadeSlideIn = trigger('fadeSlideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const pageTransition = trigger('pageTransition', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
  ])
]);

export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(80, [
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const cardFlipIn = trigger('cardFlipIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
    animate('450ms cubic-bezier(0.35, 0, 0.25, 1)',
      style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
  ])
]);

export const rowFadeIn = trigger('rowFadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-15px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const evolutionAnim = trigger('evolutionAnim', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.5) rotate(-10deg)' }),
    animate('200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
  ])
]);

export const xpBarAnim = trigger('xpBarAnim', [
  transition('* => *', [
    animate('500ms ease-out')
  ])
]);
