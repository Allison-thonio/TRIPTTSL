export function Header({ title = "", description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {title ? <h1 className="text-3xl font-bold tracking-tight">{title}</h1> : null}
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}

export default Header
