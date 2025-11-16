import './WhatsAppButton.css';

function WhatsAppButton() {
  const phoneNumber = '923001234567';
  const message = 'Hello! I am interested in your Pure Sidr Honey products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;
