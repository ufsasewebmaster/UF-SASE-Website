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
    href: "https://www.discord.com/ufsase",
    iconClass: "icon-[ic--baseline-discord]",
  },
];

const SocialIcons = () => (
  <div className="mb-2 ml-12 flex h-6 w-6 gap-4">
    {socialLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={`${link.iconClass} text-3xl`} />
      </a>
    ))}
  </div>
);

export default SocialIcons;
