interface InputProps {
  id: string;
}

export default function Input({ id }: InputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-2xl font-semibold">
        {id}
      </label>
      <span
        id={id}
        role="textbox"
        className="h-auto min-h-10 p-2 rounded-lg resize-none bg-white"
        contentEditable
      />
    </div>
  );
}
