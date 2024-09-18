import { useOs } from "@mantine/hooks";

function Mobile() {
  const os = useOs();
  const mobile = os === "ios" || os === "android";
  return mobile;
}

export default Mobile;
