import {
  Body,
  Column,
  Head,
  Heading,
  Html,
  Row,
  Section,
} from "@react-email/components";
import { z } from "zod";
import { ContactformSchema } from "../forms/contact-form";

export default function Contact({
  data,
}: {
  data: z.infer<typeof ContactformSchema>;
}) {
  return (
    <Html>
      <Body>
        <Heading as="h1">Client request</Heading>
        <Section>
          <Row>
            <Column
              style={{
                display: "flex",
                gap: "45px",
                fontSize: "12px",
                fontWeight: "normal",
              }}>
              <h1>Name:</h1>
              <h1>{data.name}</h1>
            </Column>
          </Row>
          <Row>
            <Column
              style={{
                display: "flex",
                gap: "45px",
                fontSize: "12px",
                fontWeight: "normal",
              }}>
              <h1>Email:</h1>
              <h1>{data.email}</h1>
            </Column>
          </Row>
          <Row>
            <Column
              style={{
                display: "flex",
                gap: "45px",
                fontSize: "12px",
                fontWeight: "normal",
              }}>
              <h1>Message:</h1>
              <h1>{data.description}</h1>
            </Column>
          </Row>
        </Section>
      </Body>
    </Html>
  );
}
