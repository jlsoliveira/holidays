interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}
export const TabList = ({ children, className }: TabsListProps) => {
  const containerClassName = ["flex gap-6 border-b border-gray-200 mt-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="tablist" className={containerClassName}>
      {children}
    </div>
  );
};
