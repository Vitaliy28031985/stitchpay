interface UserAvatarProps {
  initials?: string;
  className?: string;
}

export function UserAvatar({ initials = 'ОШ', className = '' }: UserAvatarProps) {
  return (
    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ${className}`} aria-label="Аватар користувача">
      {initials}
    </div>
  );
}
