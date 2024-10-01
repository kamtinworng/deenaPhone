"use client";

import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Title,
  Text,
  Paper,
  Divider,
  Grid,
} from "@mantine/core";

function AboutUs() {
  // const mockData = [
  //   { image: "/phone1.jpg", type: "news" },
  //   { image: "/phone2.jpg", type: "promotion" },
  //   { image: "/phone3.jpg", type: "news" },
  //   { image: "/phone4.jpg", type: "promotion" },
  // ];

  // const cardNewsORPromotions = mockData.map((data, index) => {
  //   return (
  //     <Card mt={"lg"} padding="lg" key={index}>
  //       <Card.Section>
  //         <Image
  //           src={data.image}
  //           radius={"md"}
  //           height={400}
  //           width={150}
  //           alt="product"
  //         />
  //       </Card.Section>

  //       <Group justify="space-between" mt="md" mb="xs">
  //         <Text fw={500}>Iphone16</Text>
  //         <NumberFormatter prefix="฿ " value={1000000} thousandSeparator />
  //       </Group>

  //       <Text size="sm" c="dimmed">
  //         Black
  //       </Text>
  //     </Card>
  //   );
  // });

  return (
    <Container fluid bg={"white"} h={"100%"} w={"100vw"} p={"xl"} mt={"xl"}>
      <Grid justify={"space-around"} mt={"xl"} grow>
        <Grid.Col span={"auto"}>
          <Flex direction={"column"}>
            <Title>Get in touch</Title>
            <Text>
              Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <SimpleGrid cols={2} spacing="md" verticalSpacing="md">
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
      <Divider my={"md"} />
      <Grid justify={"space-around"} mt={"xl"} grow>
        <Grid.Col span={"auto"}>
          <Flex direction={"column"}>
            <Title>Locations</Title>
            <Text>
              Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum
              commodo.
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <SimpleGrid cols={2} spacing="md" verticalSpacing="md">
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
            <Paper radius="md" p={"xl"} bg={"#f9fafb"}>
              <Title order={4}>Collaborate</Title>
              <Button variant="transparent" c={"blue"}>
                collaborate@example.com
              </Button>
              <Text>+1 (555) 905-2345</Text>
            </Paper>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default AboutUs;
