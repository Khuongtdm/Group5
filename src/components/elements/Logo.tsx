import BlazeLogoLight from "@/assets/logo/blaze-light.png";

const Logo = (props: { className: string }) => (
  <img src={BlazeLogoLight} alt={"Blaze"} className={props.className} />
);

export default Logo;
