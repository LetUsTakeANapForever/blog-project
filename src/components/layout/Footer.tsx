const Footer = () => {
  return (
    <div className="flex justify-end bg-zinc-800">
      &#169; {`${new Date().getFullYear()} - Nonchamid`}
    </div>
  );
};

export default Footer;