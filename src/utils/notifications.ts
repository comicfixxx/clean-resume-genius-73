import { toast } from "@/hooks/use-toast";

const worldCities = [
  // Asia
  "Mumbai", "Tokyo", "Shanghai", "Dubai", "Singapore",
  // Europe
  "London", "Paris", "Berlin", "Rome", "Amsterdam",
  // Americas
  "New York", "Toronto", "São Paulo", "Mexico City", "Vancouver",
  // Africa
  "Cairo", "Lagos", "Cape Town", "Nairobi", "Casablanca",
  // Oceania
  "Sydney", "Melbourne", "Auckland", "Wellington", "Brisbane"
];

const internationalNames = [
  // Indian
  "Arjun", "Priya", "Rahul", "Deepa", "Raj",
  // Chinese
  "Li Wei", "Zhang Min", "Wang Lei", "Liu Yan", "Chen Yu",
  // Arabic
  "Mohammed", "Fatima", "Ahmed", "Aisha", "Omar",
  // European
  "Emma", "Lucas", "Sofia", "Alexander", "Isabella",
  // American
  "James", "Olivia", "William", "Ava", "Michael",
  // African
  "Kwame", "Amara", "Chioma", "Zainab", "Malik",
  // Latin American
  "Carlos", "Maria", "Juan", "Ana", "Luis",
  // Japanese
  "Yuki", "Hiroshi", "Sakura", "Kenji", "Aiko"
];

export const generateNotification = () => {
  const randomName = internationalNames[Math.floor(Math.random() * internationalNames.length)];
  const randomCity = worldCities[Math.floor(Math.random() * worldCities.length)];
  
  return {
    name: randomName,
    place: randomCity,
    timestamp: new Date()
  };
};

export const showRealtimeNotification = () => {
  const notification = generateNotification();
  
  toast({
    title: "New Resume Created! 🌎",
    description: `${notification.name} from ${notification.place} just created their resume`,
    duration: 3000
  });
};

let notificationInterval: NodeJS.Timeout;

export const startRealtimeNotifications = () => {
  // Show notifications every 15-45 seconds for more frequent updates
  notificationInterval = setInterval(() => {
    showRealtimeNotification();
  }, Math.random() * (45000 - 15000) + 15000);
};

export const stopRealtimeNotifications = () => {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
};