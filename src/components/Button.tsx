interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`mt-4 rounded bg-red-700 py-2 px-4 text-3xl font-bold text-white transition-colors hover:bg-red-600 ${props.className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
