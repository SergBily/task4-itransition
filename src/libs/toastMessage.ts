const createToastMessage = (s: string, u: string[]) => (u.length > 1 ? `Users ${u} have been ${s}` : `User ${u} has been ${s}`);

export default createToastMessage;
