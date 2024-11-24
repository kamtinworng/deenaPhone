import {
  SimpleGrid,
  Image,
  Text,
  AspectRatio,
  Card,
  Modal,
  TextInput,
  Title,
  Flex,
  Button,
} from "@mantine/core";
import { TYPEINSTALLMENTPAYMENT } from "../typeInstallmentPayment";
import classes from "../ArticlesCardsGrid.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
function CustomerDetail(props: {
  installmentPayment: TYPEINSTALLMENTPAYMENT | null;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [index, setIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const defaultValue = props.installmentPayment;
    form.setValues({
      customerName: defaultValue?.customerName,
      facebookLink: defaultValue?.facebookLink,
      tel: defaultValue?.tel,
      SPID: defaultValue?.recipientId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.installmentPayment]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      customerName: "",
      facebookLink: "",
      tel: "",
      SPID: "",
    },

    validate: {
      customerName: (value) => (value === "" ? "กรุณากรอกข้อมูลด้วย" : null),
      facebookLink: (value) => (value === "" ? "กรุณากรอกข้อมูลด้วย" : null),
      tel: (value) => (value === "" ? "กรุณากรอกข้อมูลด้วย" : null),
    },
  });

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

  const updateCustomer = (values: {
    customerName: string;
    facebookLink: string;
    tel: string;
    SPID: string;
  }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customerName: values.customerName,
      facebookLink: values.facebookLink,
      tel: values.tel,
      SPID: values.SPID,
      idInstallmentPayments: props.installmentPayment?.id,
    });

    fetch(`${process.env.NEXT_PUBLIC_NEXT_API as string}/updateCustomer`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
    })
      .then((res) => res.json())
      .then((value: { message: string; id: string | null }) => {
        if (value.id) {
          router.push(`../InstallmentPayments/${value.id}`);
        } else {
          notifications.show({
            icon: <IconCheck size={14}></IconCheck>,
            title: value.message,
            message: "ดำเนินการแก้ไขข้อมูลของลูกค้าสำเร็จแล้ว",
            color: "green",
          });
        }
      });
  };

  return (
    <>
      <Card withBorder shadow="sm">
        <form onSubmit={form.onSubmit((values) => updateCustomer(values))}>
          <Flex justify={"space-between"}>
            <Title order={5}>ข้อมูลลูกค้า</Title>
            <Button variant="subtle" type="submit">
              แก้ไขข้อมูล
            </Button>
          </Flex>
          <SimpleGrid
            cols={{ lg: 4, md: 2, sm: 1 }}
            spacing="md"
            verticalSpacing="md"
            mt={"md"}
          >
            <TextInput
              label="ชื่อลูกค้า"
              key={form.key("customerName")}
              {...form.getInputProps("customerName")}
            ></TextInput>
            <TextInput
              label="เฟสบุ๊ต"
              key={form.key("facebookLink")}
              {...form.getInputProps("facebookLink")}
            ></TextInput>
            <TextInput
              label="เบอร์โทรศัพท์"
              key={form.key("tel")}
              {...form.getInputProps("tel")}
            ></TextInput>
            <TextInput
              label="SPID"
              key={form.key("SPID")}
              {...form.getInputProps("SPID")}
            ></TextInput>
          </SimpleGrid>
        </form>
      </Card>
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
