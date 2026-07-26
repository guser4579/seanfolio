export function Thesis({ children }) {
  return <blockquote className="thesis">{children}</blockquote>;
}

export function Fig({ caption, ph, phClass = 'shot', src, alt }) {
  return (
    <figure>
      {src ? (
        <div className="frame">
          <img src={src} alt={alt || caption || ''} />
        </div>
      ) : (
        <div className={`frame ph ${phClass}`}>[ {ph} ]</div>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Band({ label = 'Filmstrip of screens', count = 5, images }) {
  if (images) {
    return (
      <div className="band" role="group" aria-label={label}>
        <div className="strip">
          {images.map(({ src, alt, w, h }) => (
            <img
              className="screen"
              src={src}
              alt={alt}
              width={w}
              height={h}
              style={{ '--ar': w / h }}
              loading="lazy"
              key={src}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="band" role="img" aria-label={label}>
      <div className="strip">
        {Array.from({ length: count }).map((_, i) => (
          <div className="cardlet ph" key={i}>
            [ screen ]
          </div>
        ))}
      </div>
    </div>
  );
}
