import { Fragment } from 'react';

export function Thesis({ children }) {
  return <blockquote className="thesis">{children}</blockquote>;
}

export function Fig({ caption, ph, phClass = 'shot', src, alt, natural }) {
  return (
    <figure>
      {src ? (
        <div className="frame">
          <img className={natural ? 'natural' : undefined} src={src} alt={alt || caption || ''} />
        </div>
      ) : (
        <div className={`frame ph ${phClass}`}>[ {ph} ]</div>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Band({ label = 'Filmstrip of screens', count = 5, images, breakAfter, layout, frameHeight }) {
  // mask: every screen sits in its own fixed-height mask at the screen's
  // logical width, with a hairline border and the article-component radius.
  // Default height is 560px (portrait phone screens); pass frameHeight to
  // tune it for other aspects (e.g. wide desktop screens). Taller scrolling
  // screens crop at the mask's bottom edge, keeping the row uniform.
  if (images && layout === 'mask') {
    return (
      <div className="band" role="group" aria-label={label}>
        <div
          className="strip masks"
          style={frameHeight ? { '--maskh': frameHeight } : undefined}
        >
          {images.map(({ src, alt, w, h }) => (
            <div className="mask" key={src}>
              <img src={src} alt={alt} width={w} height={h} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  // natural: images at a fixed modest size, top-aligned, centered as a group
  // when the viewport has room, horizontal scroll when it does not. The
  // images carry their own card styling (baked-in corners/shadows) - no chrome.
  if (images && layout === 'natural') {
    return (
      <div className="band" role="group" aria-label={label}>
        <div className="strip natural">
          {images.map(({ src, alt, w, h }) => (
            <img
              className="screen-nat"
              src={src}
              alt={alt}
              width={w}
              height={h}
              loading="lazy"
              key={src}
            />
          ))}
        </div>
      </div>
    );
  }
  if (images) {
    return (
      <div className="band" role="group" aria-label={label}>
        <div className="strip">
          {images.map(({ src, alt, w, h }, i) => (
            <Fragment key={src}>
              <img
                className="screen"
                src={src}
                alt={alt}
                width={w}
                height={h}
                style={{ '--ar': w / h }}
                loading="lazy"
              />
              {breakAfter === i + 1 && i + 1 < images.length ? (
                <span className="screen-break" aria-hidden="true" />
              ) : null}
            </Fragment>
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
