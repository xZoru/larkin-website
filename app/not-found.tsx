export default function NotFound() {
  return (
    <main className="not-found-page">
      <a className="not-found-brand" href="/" aria-label="Larkin Enterprises home">
        <img src="/images/Larkin%20Company%20Profile.png" alt="Larkin Enterprises" />
      </a>
      <p className="not-found-code">404 <span>— PAGE NOT FOUND</span></p>
      <h1>This page isn’t<br />on the map.</h1>
      <p className="not-found-copy">The page may have moved, or the address may be incorrect.</p>
      <a className="not-found-home" href="/">Back to home <span aria-hidden="true">↗</span></a>
    </main>
  );
}
