import BlazeDarkLogo from "@/assets/logo/blaze-dark.png";

const Logo = (props: { className: string }) => (
  <img src={BlazeDarkLogo} alt={"Blaze"} className={props.className} />
);

export default Logo;
