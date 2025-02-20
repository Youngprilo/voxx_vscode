

export interface EmergencyButton {
    name: string;
    label: string;
}

const buttons: EmergencyButton[] = [
    {
        label: "❤️  Health",
        name: "health"
    },
    {
        label: "🔥  Fire Outbreak",
        name: "fire"
    },
    {
        label: "🚨  Break In",
        name: "breakin"
    },
    {
        label: "🦗  Stranded",
        name: "stranded"
    }
];

export const useEmergencyButtons = () => buttons;