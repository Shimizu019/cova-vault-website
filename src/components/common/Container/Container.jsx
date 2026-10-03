function Container({ children, size = 'default', className = '' }) {
  const baseClass = 'container';
  const sizeClass = size === 'sm' ? 'container-sm' : size === 'lg' ? 'container-lg' : baseClass;
  const combinedClass = `${sizeClass} ${className}`.trim();

  return <div className={combinedClass}>{children}</div>;
}

export default Container;