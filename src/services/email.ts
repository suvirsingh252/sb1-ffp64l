import { format } from 'date-fns';
import { Participant, ParticipantStatus } from '../types/participant';
import { QuoteLineItem } from '../types/quote';
import { Contractor } from '../types/team';

class EmailService {
  private async sendEmail(to: string, subject: string, body: string) {
    // In a real application, this would use nodemailer or an email service API
    console.log('Sending email:', { to, subject, body });
  }

  // ... (keep existing methods)

  async sendQuoteRequest(
    contractor: Contractor,
    participant: Participant,
    lineItems: QuoteLineItem[],
    validityPeriod: number = 30
  ) {
    const subject = `Quote Request: Energy Efficiency Upgrades - ${participant.address}`;
    
    const itemsList = lineItems
      .map(item => (
        `• ${item.description}\n` +
        `  Specifications: ${item.specifications}\n` +
        `  Quantity: ${item.quantity} ${item.unit}`
      ))
      .join('\n\n');

    const body = `
Dear ${contractor.contactPerson},

We are requesting a quote for the following energy efficiency upgrades at:

${participant.address}
${participant.city}, NS ${participant.postalCode}

Requested Upgrades:

${itemsList}

Please provide a detailed quote including:
- Itemized costs for materials and labor
- Estimated timeline for completion
- Any additional recommendations or alternatives
- Warranty information

Quote Requirements:
- Please provide the quote within 5 business days
- Quote should be valid for ${validityPeriod} days
- Include your contractor license number and insurance information
- Reference project number: ${participant.id}

Site Details:
Property Type: ${participant.propertyType}
Program: ${participant.program}

If you need to schedule a site visit or require additional information, please contact us at your earliest convenience.

Best regards,
Energy Audit Team
    `.trim();

    await this.sendEmail(contractor.email, subject, body);

    // Send confirmation to participant
    const participantSubject = 'Quote Request Sent - Energy Efficiency Upgrades';
    const participantBody = `
Dear ${participant.firstName} ${participant.lastName},

We have sent a quote request to ${contractor.name} for your approved energy efficiency upgrades. They will review the requirements and provide a detailed quote within 5 business days.

We will notify you once we receive their response.

Best regards,
Energy Audit Team
    `.trim();

    await this.sendEmail(participant.email, participantSubject, participantBody);
  }

  async sendQuoteReceived(
    participant: Participant,
    contractor: Contractor,
    totalAmount: number
  ) {
    const subject = 'Quote Received for Your Energy Efficiency Upgrades';
    const body = `
Dear ${participant.firstName} ${participant.lastName},

We have received a quote from ${contractor.name} for your approved energy efficiency upgrades.

Total Quote Amount: $${totalAmount.toLocaleString()}

Our technical team will review the quote and contact you with the next steps.

Best regards,
Energy Audit Team
    `.trim();

    await this.sendEmail(participant.email, subject, body);
  }
}

export const emailService = new EmailService();