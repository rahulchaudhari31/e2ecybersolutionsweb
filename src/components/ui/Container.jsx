export default function Container({
  as: Tag = "div",
  wide = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`${wide ? "container-wide" : "container-x"} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
