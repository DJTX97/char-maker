interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return <div className="dark:text-white">{title}</div>;
}
