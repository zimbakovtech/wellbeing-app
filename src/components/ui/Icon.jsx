// Central icon registry. Importing named icons (rather than the whole library)
// keeps the bundle lean and gives every icon one consistent stroke + size API.
import {
  Moon,
  HeartPulse,
  Footprints,
  Users,
  Smartphone,
  GraduationCap,
  AlarmClock,
  Wind,
  ListChecks,
  Filter,
  Bike,
  MessageCircle,
  HeartHandshake,
  PenLine,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  Sparkles,
  Compass,
  ClipboardCheck,
  LifeBuoy,
  Check,
  RotateCcw,
  Heart,
  Quote,
  TrendingDown,
  Lightbulb,
  ShieldCheck,
  Leaf,
  BookOpen,
  Phone,
} from 'lucide-react'

const REGISTRY = {
  Moon,
  HeartPulse,
  Footprints,
  Users,
  Smartphone,
  GraduationCap,
  AlarmClock,
  Wind,
  ListChecks,
  Filter,
  Bike,
  MessageCircle,
  HeartHandshake,
  PenLine,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  Sparkles,
  Compass,
  ClipboardCheck,
  LifeBuoy,
  Check,
  RotateCcw,
  Heart,
  Quote,
  TrendingDown,
  Lightbulb,
  ShieldCheck,
  Leaf,
  BookOpen,
  Phone,
}

/**
 * <Icon name="Moon" className="..." /> - single stroke language across the app.
 * Decorative by default (aria-hidden); pass a `label` to expose it to AT.
 */
export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.75, label, style }) {
  const Cmp = REGISTRY[name]
  if (!Cmp) return null
  return (
    <Cmp
      className={className}
      strokeWidth={strokeWidth}
      style={style}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  )
}
