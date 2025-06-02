import { Carousel } from "@mantine/carousel";
import {
  Text,
  Image,
  Card,
  Group,
  NumberFormatter,
  Paper,
  Title,
  SimpleGrid,
  TextInput,
  Box,
} from "@mantine/core";
import classes from "../CarouselCard.module.css";
import { TYPEINSTALLMENTPAYMENT } from "../typeInstallmentPayment";

function ProductDetail(props: {
  installmentPayment: TYPEINSTALLMENTPAYMENT | null;
  customer: boolean;
}) {
  if (!props.installmentPayment) return;
  const installmentPayment = props.installmentPayment;
  const slides = installmentPayment?.product ? installmentPayment?.product.images.map((image) => (
    <Carousel.Slide key={image}>
      <Image alt="image" src={image} height={456} />
    </Carousel.Slide>
  )) :
    <Image src='' height={456} />
    ;

  return (
    <SimpleGrid cols={{ lg: 2, md: 1, xs: 1 }}>
      <Card radius="md" withBorder padding="xl">
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
        </Card.Section>

        <Group justify="space-between" mt="lg">
          <Text fw={500} fz="lg">
            {installmentPayment?.product ? installmentPayment?.product.deviceName : ''}
          </Text>
        </Group>

        <Text fz="sm" c="dimmed" mt="sm">
          {installmentPayment?.product ? installmentPayment?.product.deviceDetail : ''}
        </Text>

        <Group justify="space-between" mt="md">
          <div>
            <Text fz="xl" span fw={500} className={classes.price}>
              <NumberFormatter
                prefix="฿ "
                value={installmentPayment?.product ? installmentPayment?.product.price : ''}
                thousandSeparator
              />
            </Text>
            <Text span fz="sm" c="dimmed">
              {" "}
              / บาท
            </Text>
          </div>
        </Group>
      </Card>
      <Paper p={"lg"} shadow="xs" radius="sm">
        <Title order={5}>ข้อมูลสินค้า</Title>
        <SimpleGrid
          cols={{ lg: 2, md: 1, xs: 1 }}
          my={"md"}
          spacing="md"
          verticalSpacing="md"
        >
          <TextInput
            label="สาขาที่อยู่ของสินค้า"
            value={installmentPayment?.product ? installmentPayment?.product.branch.name : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="ชื่อสินค้า"
            value={installmentPayment?.product ? installmentPayment?.product.deviceName : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="รายละเอียดสินค้า"
            value={installmentPayment?.product ? installmentPayment?.product.deviceDetail : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="รายคาเต็ม"
            value={installmentPayment?.product ? installmentPayment?.product.price : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="ราคาดาว"
            value={installmentPayment?.product ? installmentPayment?.product.deposit : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="จำนวนงวดผ่อน"
            value={installmentPayment?.product ? installmentPayment?.product.numberOfInstallments : ''}
            placeholder="Input placeholder"
          />
          <TextInput
            label="จำนวนเงินต่อครั้งที่ผ่อนชำระ"
            value={installmentPayment?.product ? installmentPayment?.product.installmentAmount : ''}
            placeholder="Input placeholder"
          />
          <Box hidden={props.customer}>
            <TextInput
              label="ไอคลาวด์"
              value={installmentPayment?.product ? installmentPayment?.product.icloud ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="รหัสผ่านไอคลาวด์"
              value={installmentPayment?.product ? installmentPayment?.product.passwordIcloud ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="ปลดล็อคหน้าจอ"
              value={installmentPayment?.product ? installmentPayment?.product.lockscreen ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="ไอโหลด"
              value={installmentPayment?.product ? installmentPayment?.product.idLoad ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="รหัสผ่านไอโหลด"
              value={installmentPayment?.product ? installmentPayment?.product.passwordIcloud ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="อีมี่"
              value={installmentPayment?.product ? installmentPayment?.product.indentifier ?? "" : ''}
              placeholder="Input placeholder"
            />
          </Box>
          {/* <Box hidden={props.customer}> */}
          {/* <TextInput
              label="PSID"
              value={installmentPayment?.recipientId ?? ""}
              placeholder="Input placeholder"
            /> */}
          {/* </Box> */}
          <Box hidden={props.customer}>
            <TextInput
              label="รหัสเวลา"
              value={installmentPayment?.timeCode ?? ""}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="รหัสหน้าจอ"
              value={installmentPayment?.screenId ?? ""}
              placeholder="Input placeholder"
            />
          </Box>
          <Box hidden={props.customer}>
            <TextInput
              label="เบอร์โทรศัพท์ที่สมัคร iCloud"
              value={installmentPayment?.icloudPhoneNumber ?? ""}
              placeholder="Input placeholder"
            />
          </Box>
        </SimpleGrid>
      </Paper>
    </SimpleGrid>
  );
}

export default ProductDetail;
