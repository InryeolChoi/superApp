import smtplib
from django.core.mail.backends.smtp import EmailBackend

class CustomEmailBackend(EmailBackend):
    def _send(self, email_message):
        try:
            self.connection.sendmail(
                email_message.from_email,
                email_message.recipients(),
                email_message.message().as_bytes(linesep='\r\n'),
            )
        except smtplib.SMTPException as e:
            print(f"Failed to send email: {e}")
            if not self.fail_silently:
                raise

    def open(self):
        if self.connection:
            return False
        try:
            self.connection = smtplib.SMTP(self.host, self.port)
            self.connection.ehlo()
            self.connection.starttls()
            self.connection.ehlo()
            if self.username and self.password:
                self.connection.login(self.username, self.password)
            return True
        except smtplib.SMTPException as e:
            print(f"Failed to open connection: {e}")
            if not self.fail_silently:
                raise
        return False