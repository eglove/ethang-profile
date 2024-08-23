import { Link } from "@nextui-org/link";
import map from "lodash/map";

const links = [
  {
    href: "https://www.amazon.com/stores/page/5212CE9B-CF76-4343-9CA0-98210EBE3D70",
    label: "O'Reilly",
  },
  {
    href: "https://www.amazon.com/stores/page/CE115F00-6246-4FD9-B2C0-85BD5D7310B6",
    label: "Packt",
  },
];

export const Reading = () => {
  return (
    <div className="prose max-w-max text-foreground">
      <p>
        I always recommend keeping up to date with recently published books in
        the field. Here are my recommended publishers and authors:
      </p>
      <ul className="list-decimal">
        {map(links, (link) => {
          return (
            <li>
              <Link
                isExternal
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
