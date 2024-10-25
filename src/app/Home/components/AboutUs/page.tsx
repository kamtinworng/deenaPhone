"use client";

import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Title,
  Text,
  Paper,
  Grid,
} from "@mantine/core";
import Mobile from "../../../../../libs/mobile";

function AboutUs() {
  return (
    <Container fluid bg={"white"} h={"100%"} w={"100vw"} p={"xl"} mt={"xl"}>
      <Grid justify={"space-around"} mt={"xl"} grow>
        <Grid.Col span={Mobile() ? 9 : "auto"}>
          <Flex direction={"column"}>
            <Title>Locations</Title>
            <Text>
              1117 ม.4 ถ.เพชรเกษม ต.ควนลัง อ.หาดใหญ่ จ.สงขลา, Hat Yai, Thailand,
              Songkhla
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <SimpleGrid
            cols={{ lg: 2, sm: 2, xs: 1 }}
            spacing="md"
            verticalSpacing="md"
          >
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>เบอร์โทรศัพท์ร้าน</Title>
              <Text>098 919 1324</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>facebook</Title>
              <Button
                variant="transparent"
                component="a"
                href="https://web.facebook.com/profile.php?id=100086694325778&sk=about"
                c={"blue"}
              >
                deenaphone
              </Button>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>เวลาทำการ</Title>
              <Text>เปิดตลอดเวลา</Text>
            </Paper>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default AboutUs;
