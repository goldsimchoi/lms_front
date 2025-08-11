export default function Card({ title, children, footer }){
    return (
      <div className="card">
        {title && <h1 className="card__title">{title}</h1>}
        <div className="card__body">{children}</div>
        {footer && <div className="card__footer">{footer}</div>}
      </div>
    );
  }