import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Row,
    Button,
} from "@react-email/components";

// ✅ define props
interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({
    username,
    otp,
}: VerificationEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#f6f9fc" }}>
                <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>

                    <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Welcome {username} 🎉
                    </Text>

                    <Text>
                        Thanks for signing up. Use the OTP below to verify your account.
                    </Text>

                    {/* ✅ OTP display */}
                    <Row>
                        <Text
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                letterSpacing: "2px",
                                color: "#007bff",
                            }}
                        >
                            {otp}
                        </Text>
                    </Row>

                    <Text>
                        Or click the button below:
                    </Text>

                    <Button
                        href="https://yourapp.com/verify"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                    >
                        Verify Email
                    </Button>

                </Container>
            </Body>
        </Html>
    );
}