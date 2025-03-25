export function maskString(text: string) {
  const [username, domain] = text.split("@");
  const maskedUsername =
    username.charAt(0) + "****" + username.charAt(username.length - 1);
  return maskedUsername + "@" + domain;
}

export function getDomain(email: string) {
  const regex = /@([^\s@]+)$/;
  const result = regex.exec(email);
  if (result && result.length > 1) {
    return result[1];
  } else {
    return null;
  }
}

export function stringToSlug(str: string): string {
  const slug = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/--+/g, "_")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return slug;
}
