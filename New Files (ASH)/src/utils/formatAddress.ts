export function formatAddressWithMiddleDot(address: string | undefined) {
    return address && `${address.substring(0, 7)  }...${  address.substring(address.length  - 5, address.length)}`;
}