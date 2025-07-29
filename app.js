const { useState, useEffect } = React;

// Demo data - РЕДАКТИРОВАТЬ ЗДЕСЬ ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const cardData = [
    {
        title: "Уютная беседка",
        short: "Просторная беседка для отдыха на свежем воздухе",
        images: [
            'https://picsum.photos/600/400?random=2',
            'https://picsum.photos/600/400?random=3', 
            'https://picsum.photos/600/400?random=4'
        ],
        long: "Просторная деревянная беседка на 10-12 человек, оборудованная столами и скамейками. Идеальное место для семейных обедов, игр и вечерних посиделок. Беседка защищена от дождя и ветра, имеет хорошее освещение. Рядом расположена зона для барбекю и мангала. В беседке есть розетки для подключения электроприборов."
    },
    {
        title: "Зона барбекю",
        short: "Оборудованная площадка для приготовления шашлыков",
        images: [
            'https://picsum.photos/600/400?random=5',
            'https://picsum.photos/600/400?random=6'
        ],
        long: "Специально оборудованная зона для приготовления пищи на открытом огне. В наличии: стационарный мангал, решетки для гриля, столы для разделки продуктов. Рядом расположены мойка с проточной водой и место для хранения дров. Зона безопасна и соответствует всем противопожарным требованиям."
    },
    {
        title: "Детская площадка", 
        short: "Безопасная игровая зона для детей разных возрастов",
        images: [
            'https://picsum.photos/600/400?random=7',
            'https://picsum.photos/600/400?random=8',
            'https://picsum.photos/600/400?random=9'
        ],
        long: "Современная детская площадка с качелями, горками, песочницей и спортивными снарядами. Все оборудование изготовлено из экологически чистых материалов и регулярно проходит проверку безопасности. Площадка огорожена и имеет мягкое покрытие. Рядом установлены скамейки для родителей."
    },
    {
        title: "Парковка",
        short: "Удобная парковочная зона для автомобилей гостей",
        images: [
            'https://picsum.photos/600/400?random=10',
            'https://picsum.photos/600/400?random=11'
        ],
        long: "Просторная парковочная зона на 8-10 автомобилей. Парковка имеет твердое покрытие, хорошо освещается в темное время суток. Въезд и выезд удобные, есть место для разворота. Парковочные места размечены, территория охраняется. Рядом с парковкой расположена основная тропинка к зоне отдыха."
    }
];

function Header() {
    return (
        <header className="header">
            <div className="header-bg"></div>
            <div className="header-overlay"></div>
            <div className="header-content">
                <h1>Станция Сосновая</h1>
                <h2>База отдыха</h2>
            </div>
        </header>
    );
}

function Card({ card, onCardClick }) {
    return (
        <div className="card" onClick={() => onCardClick(card)}>
            <img
                src={card.images[0]}
                alt={card.title}
                className="card-image"
            />
            <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.short}</p>
            </div>
        </div>
    );
}

function Modal({ card, isOpen, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => (document.body.style.overflow = '');
    }, [isOpen, card]);

    if (!isOpen || !card) return null;

    const next = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((i) => (i + 1) % card.images.length);
    };
    const prev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((i) => (i - 1 + card.images.length) % card.images.length);
    };

    const modalContent = (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{card.title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="carousel-container">
                    <img src={card.images[currentImageIndex]} className="carousel-image" alt={card.title} />
                    {card.images.length > 1 && (
                        <>
                            <button className="carousel-button prev" onClick={prev}>‹</button>
                            <button className="carousel-button next" onClick={next}>›</button>
                        </>
                    )}
                </div>
                <div className="modal-body">
                    <p className="modal-description">{card.long}</p>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

function CardsSection() {
    const [selected, setSelected] = useState(null);
    const isOpen = Boolean(selected);
    return (
        <section className="cards-section">
            <div className="container">
                <h2 className="section-title">Что есть на участке</h2>
                <div className="cards-grid">
                    {cardData.map((c, i) => (
                        <Card key={i} card={c} onCardClick={setSelected} />
                    ))}
                </div>
            </div>
            <Modal card={selected} isOpen={isOpen} onClose={() => setSelected(null)} />
        </section>
    );
}

function Footer() {
    const ContactLink = ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="contact-item">
            {children}
        </a>
    );

    const TelegramIcon = (
        <svg className="contact-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
    );
    const WhatsAppIcon = (
        <svg className="contact-icon" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.52 7.01c.2-.07.4-.02.4.24 0 .41-.12 2.28-.17 2.64-.05.36-.3.42-.6.26-.32-.18-1.37-.6-1.37-.6s-.72-.45-.94-.77c-.24-.32-.39-.66-.44-.87-.04-.2.07-.35.18-.46.1-.1.23-.15.23-.15s.18-.12.81.19c.47.23 1.17.8 1.17.8s.72.35.73.46c.01.11-.07.24-.07.24z"/></svg>
    );
    const PhoneIcon = (
        <svg className="contact-icon" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
    );

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <ContactLink href="tel:+79123456789">
                        {PhoneIcon} +7 (912) 345-67-89
                    </ContactLink>
                    <ContactLink href="https://t.me/stanciya_sosnovaya">
                        {TelegramIcon} Telegram
                    </ContactLink>
                    <ContactLink href="https://wa.me/79123456789">
                        {WhatsAppIcon} WhatsApp
                    </ContactLink>
                </div>
            </div>
        </footer>
    );
}

function App() {
    return (
        <>
            <Header />
            <CardsSection />
            <Footer />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));