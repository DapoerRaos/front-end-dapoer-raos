export function calculateShippingCost(totalWeight) {
  if (totalWeight > 0 && totalWeight <= 1) {
    return 5000;
  } else if (totalWeight > 1 && totalWeight <= 3) {
    return 7000;
  } else if (totalWeight > 3 && totalWeight <= 5) {
    return 10000;
  } else if (totalWeight > 5 && totalWeight <= 8) {
    return 18000;
  } else if (totalWeight > 8 && totalWeight <= 12) {
    return 24000;
  }
}
