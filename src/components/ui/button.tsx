import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]':
              variant === 'default' || variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-muted active:scale-[0.98]':
              variant === 'secondary',
            'border border-input bg-background hover:bg-muted hover:text-foreground active:scale-[0.98]':
              variant === 'outline',
            'hover:bg-muted hover:text-foreground active:scale-[0.98]':
              variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
