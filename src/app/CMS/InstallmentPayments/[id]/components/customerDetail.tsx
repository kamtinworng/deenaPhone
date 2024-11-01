import {
  SimpleGrid,
  Image,
  Text,
  AspectRatio,
  Card,
  Modal,
} from "@mantine/core";
import { TYPEINSTALLMENTPAYMENT } from "../typeInstallmentPayment";
import classes from "../ArticlesCardsGrid.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
function CustomerDetail(props: {
  installmentPayment: TYPEINSTALLMENTPAYMENT | null;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [index, setIndex] = useState(0);

  if (!props.installmentPayment) return;
  const installmentPayment = props.installmentPayment;

  const customers = [
    {
      title: "รูปลูกค้ารับเครื่อง",
      image: installmentPayment.customerReceivingImage,
    },
    {
      title: "สัญญาผ่อน",
      image: installmentPayment.paymentAgreementFile,
    },
    {
      title: "รูปอีมี่ที่เครื่อง",
      image: installmentPayment.deviceImeiImageFile,
    },
    {
      title: "รูปบัตรประชาชน",
      image: installmentPayment.idCardImage,
    },
    {
      title: "รูปหน้า Facebook",
      image: installmentPayment.houseRegistrationImage,
    },
  ];
  const cards = customers.map((article, index) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      style={{ cursor: "pointer" }}
      className={classes.card}
      onClick={() => {
        open();
        setIndex(index);
      }}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image alt="image" src={article.image} />
      </AspectRatio>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={customers[index].title}
        size={"xl"}
      >
        <Image alt="image" src={customers[index].image}></Image>
      </Modal>
      <SimpleGrid cols={{ lg: 5, md: 3, sm: 2, xs: 1 }}>{cards}</SimpleGrid>
    </>
  );
}
export default CustomerDetail;
