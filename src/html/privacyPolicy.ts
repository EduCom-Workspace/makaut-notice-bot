import { html } from "hono/html";

export const PrivacyPolicy = () => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Makaut Notice Bot Privacy & Policy</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          color: #333;
        }
        h1,
        h2 {
          color: #444;
        }
        ul {
          padding-left: 20px;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>Privacy Policy</h1>
      <p>
        Welcome to <strong>Makaut Notice Bot</strong>! This policy explains how
        we collect, use, store, and protect your personal data when you use our
        service. Your privacy is our top priority.
      </p>

      <h2>1. Data Collection</h2>
      <p>We collect the following data when you use the bot:</p>
      <ul>
        <li>
          <strong>Username:</strong> Used to identify you for sending notices.
        </li>
        <li>
          <strong>Name:</strong> Collected for personalization of messages.
        </li>
      </ul>
      <p>
        No additional personal data is collected without your explicit consent.
      </p>

      <h2>2. Purpose of Data Collection</h2>
      <p>Your data is collected to provide the following services:</p>
      <ul>
        <li>Sending real-time notices and updates relevant to MAKAUT.</li>
        <li>
          Improving the accuracy and functionality of the bot’s notice delivery
          system.
        </li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <p>
        All user data is stored in an encrypted format using
        <strong>Cloudflare</strong> for maximum security. We implement
        industry-standard measures to ensure data is safe from unauthorized
        access, modification, or deletion.
      </p>
      <p>
        We regularly review our security practices to safeguard your data
        effectively.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        We do not share, sell, or transfer any user data to third parties under
        any circumstances unless required by law.
      </p>

      <h2>5. Data Retention and Deletion</h2>
      <p>
        Your data will be retained as long as you use the bot. If you no longer
        wish for us to store your information, you can send the command
        <strong>/removemydata</strong>. Once received:
      </p>
      <ul>
        <li>Your data will be permanently deleted from our system.</li>
        <li>You will no longer receive notices from the bot.</li>
      </ul>

      <h2>6. User Rights</h2>
      <p>As a user, you have the following rights:</p>
      <ul>
        <li>The right to know what data we collect and how it is used.</li>
        <li>The right to request deletion of your data at any time.</li>
        <li>
          The right to withdraw consent for data collection by discontinuing use
          of the bot.
        </li>
      </ul>

      <h2>7. Future Changes and Updates</h2>
      <p>
        If we decide to update or change how your data is collected or used, you
        will be notified in advance through the bot. Any changes will only take
        effect after receiving your explicit consent.
      </p>

      <h2>8. Developer Details</h2>
      <p>
        If you have any questions, concerns, or need assistance regarding this
        Privacy Policy or the bot, you can contact the developer directly:
      </p>
      <ul>
        <li><strong>Name:</strong> Shovan Mondal</li>
        <li>
          <strong>Email:</strong>
          <a href="mailto:shovan04.rerf.cse.01@gmail.com"
            >shovan04.rerf.cse.01@gmail.com</a
          >
        </li>
        <li>
          <strong>GitHub:</strong>
          <a href="https://github.com/shovan04" target="_blank"
            >https://github.com/shovan04</a
          >
        </li>
      </ul>

      <h2>9. Acceptance of Policy</h2>
      <p>
        By using the <strong>Makaut Notice Bot</strong>, you confirm that you
        have read, understood, and agreed to this Privacy Policy. If you do not
        agree, please discontinue use of the bot.
      </p>
    </body>
  </html>
`;
