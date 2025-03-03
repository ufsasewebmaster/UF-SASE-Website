const socialLinks = [
  {
    href: "https://www.instagram.com/ufsase/",
    iconClass: "icon-[lets-icons--insta]",
  },
  {
    href: "https://www.linkedin.com/company/ufsase",
    iconClass: "icon-[mdi--linkedin]",
  },
  {
    href: "https://www.linktr.ee/ufsase",
    iconClass: "icon-[ph--linktree-logo-fill]",
  },
  {
    href: "https://discord.com/invite/q3HBeC5",
    iconClass: "icon-[ic--baseline-discord]",
  },
];

const SocialIcons = () => (
  <div className="flex items-center justify-center gap-6">
    {socialLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="h-6 w-6 shadow-md transition hover:scale-110 hover:shadow-2xl"
      >
        <span className={`${link.iconClass} text-3xl`} />
      </a>
    ))}
  </div>
);

export default SocialIcons;
