import React, { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  scroll-margin-top: 80px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

// Browser extensions may add attributes such as fdprocessedid before hydration.
// Keep the escape hatch on the affected input elements only.
const ContactInput = styled.input.attrs({ suppressHydrationWarning: true })`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input.attrs({ suppressHydrationWarning: true })`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: ${({ theme }) => theme.primary};
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }
`;

const ContactStatus = styled.p`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  line-height: 1.5;
`;

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const submitting = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setIsSending(true);
    setStatus(null);
    try {
      const values = new FormData(form.current);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message. Please try again.");
      setStatus({ type: "success", text: result.message });
      form.current.reset();
    } catch (error) {
      setStatus({ type: "error", text: error.message || "Unable to send your message. Please try again." });
    } finally {
      submitting.current = false;
      setIsSending(false);
    }
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Feel free to reach out to me for any questions!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit} aria-busy={isSending}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput type="email" placeholder="Your Email" aria-label="Your Email" autoComplete="email" name="from_email" maxLength={254} required />
          <ContactInput placeholder="Your Name" aria-label="Your Name" autoComplete="name" name="from_name" maxLength={120} required />
          <ContactInput placeholder="Subject" aria-label="Subject" name="subject" maxLength={200} required />
          <ContactInputMessage placeholder="Message" aria-label="Message" name="message" rows={4} maxLength={5000} required />
          <ContactButton type="submit" value={isSending ? "Sending..." : "Send"} disabled={isSending} />
          {status && (
            <ContactStatus role={status.type === "error" ? "alert" : "status"}>
              {status.text}
            </ContactStatus>
          )}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
