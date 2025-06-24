export interface TrackerOrder {
  id?: string;
  customer: string;
  category: string;
  quote: string;
  progress: string;
  fabric: string;
  total: number;
  priority: boolean;
  date: string;
  orderNumber: string;
  rawData?: unknown;
}

export interface EditTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: TrackerOrder;
  onSave: (updatedOrder: TrackerOrder) => Promise<void>;
}

export interface ViewTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: TrackerOrder;
}

export interface DeleteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: TrackerOrder;
  onConfirm: () => Promise<void>;
}