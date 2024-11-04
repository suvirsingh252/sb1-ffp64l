// Update the handleSubmit function in QuoteRequestModal.tsx
const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    // Group line items by contractor
    const itemsByContractor = upgrades.reduce((acc, upgrade) => {
      if (upgrade.assignedContractor) {
        if (!acc[upgrade.assignedContractor]) {
          acc[upgrade.assignedContractor] = [];
        }
        const lineItem = lineItems.find(item => item.upgradeId === upgrade.id);
        if (lineItem) {
          acc[upgrade.assignedContractor].push(lineItem);
        }
      }
      return acc;
    }, {} as Record<string, QuoteLineItem[]>);

    // Create quote requests and send emails for each contractor
    await Promise.all(
      Object.entries(itemsByContractor).map(async ([contractorId, items]) => {
        // Create quote request
        await createQuoteRequest(projectId, contractorId, items);

        // Generate quote template
        await generateQuoteTemplate(contractorId);

        // Get contractor and participant details
        const contractor = contractors.find(c => c.id === contractorId);
        const participant = await getParticipantDetails(projectId);

        // Send email if we have all required details
        if (contractor && participant) {
          await emailService.sendQuoteRequest(
            contractor,
            participant,
            items
          );
        }
      })
    );

    onClose();
  } catch (error) {
    console.error('Failed to create quote requests:', error);
  } finally {
    setIsSubmitting(false);
  }
};