interface Props {
  type: string;
  children: string;
  hide: () => void;
}

const MessageBox = ({ type, children, hide }: Props) => {
  return (
    <div className={"alert " + type}>
      <button
        onClick={() => {
          hide();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <p>{children}</p>
    </div>
  );
};

export default MessageBox;
