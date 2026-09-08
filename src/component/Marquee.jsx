import './Marquee.css';

// Data ini bisa diganti dengan testimonial, client, atau highlight project kamu.
const reviews = [
  { name: 'Jack', username: '@jack', body: 'Portfolio yang rapi dan mudah dipahami.', img: 'https://avatar.vercel.sh/jack' },
  { name: 'Jill', username: '@jill', body: 'Desainnya berani, interaktif, dan terasa personal.', img: 'https://avatar.vercel.sh/jill' },
  { name: 'John', username: '@john', body: 'Pengalaman website yang unik dan berkesan.', img: 'https://avatar.vercel.sh/john' },
  { name: 'Jane', username: '@jane', body: 'Struktur informasi dan project-nya jelas.', img: 'https://avatar.vercel.sh/jane' },
  { name: 'Jenny', username: '@jenny', body: 'Animasi membuat halaman terasa hidup.', img: 'https://avatar.vercel.sh/jenny' },
  { name: 'James', username: '@james', body: 'Karya digital yang punya karakter kuat.', img: 'https://avatar.vercel.sh/james' }
];

function ReviewCard({ img, name, username, body }) {
  return (
    <figure className="review-card">
      <div className="review-author">
        <img src={img} width="32" height="32" alt="" />
        <div>
          <figcaption>{name}</figcaption>
          <p>{username}</p>
        </div>
      </div>
      <blockquote>{body}</blockquote>
    </figure>
  );
}

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className={`marquee-track${reverse ? ' marquee-track--reverse' : ''}`}>
      {[...items, ...items].map((review, index) => (
        <ReviewCard key={`${review.username}-${index}`} {...review} />
      ))}
    </div>
  );
}

function Marquee() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section className="marquee-section" aria-label="Testimonial dan highlight">
      <div className="marquee-heading">
        <p className="eyebrow">TESTIMONIALS / HIGHLIGHTS</p>
        <h2>What people say</h2>
      </div>
      <div className="marquee-window">
        <MarqueeRow items={firstRow} />
        <MarqueeRow items={secondRow} reverse />
      </div>
    </section>
  );
}

export default Marquee;
