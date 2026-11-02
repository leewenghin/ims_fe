import { Badge } from "@/src/components/Badge";
import { Card, MonthPicker } from "@/src/components/Card";
import { Icon, type IconName } from "@/src/components/Icon";
import { LineChart } from "@/src/components/LineChart";
import { PageHeader } from "@/src/components/PageHeader";
import { formatDateTime, movementTone, titleCase, type MovementType } from "@/src/lib/format";

const stats: { label: string; value: string; icon: IconName; tile: string; change: string; up: boolean; note: string }[] = [
  { label: "Total Products", value: "10", icon: "product", tile: "bg-tile-violet/[0.21] text-tile-violet dark:bg-tile-violet dark:text-white", change: "8.5%", up: true, note: "Up from last month" },
  { label: "Branches", value: "3", icon: "branch", tile: "bg-tile-yellow/[0.21] text-tile-yellow dark:bg-tile-yellow dark:text-white", change: "1 new", up: true, note: "this quarter" },
  { label: "Movements Today", value: "24", icon: "chart", tile: "bg-tile-green/[0.21] text-tile-green dark:bg-tile-green dark:text-white", change: "4.3%", up: false, note: "Down from yesterday" },
  { label: "Low Stock", value: "2", icon: "alert", tile: "bg-tile-orange/[0.21] text-tile-orange dark:bg-tile-orange dark:text-white", change: "1.8%", up: true, note: "Up from yesterday" },
];

const daily = [120, 132, 128, 150, 162, 148, 175, 160, 210, 190, 180, 238, 205, 196, 382, 172, 188, 204, 230, 214, 196, 182, 226, 262, 248, 270, 254, 236, 222, 244, 266];

const movements: { time: string; type: MovementType; sku: string; name: string; branch: string; delta: number; balance: number }[] = [
  { time: "2026-11-02T02:10:00Z", type: "ISSUE", sku: "SKU-002", name: "Ballpoint Pen Blue", branch: "HQ", delta: -2, balance: 8 },
  { time: "2026-11-01T09:00:00Z", type: "RECEIPT", sku: "SKU-001", name: "A4 Paper 80gsm", branch: "KL01", delta: 25, balance: 25 },
  { time: "2026-10-31T06:30:00Z", type: "TRANSFER", sku: "SKU-008", name: "USB-C Cable 1m", branch: "PG01", delta: 4, balance: 4 },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[14px] bg-surface p-4 shadow-card dark:border dark:border-line">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-muted">{stat.label}</p>
                <p className="mt-[18px] text-[28px] leading-[38px] font-bold tracking-[1px] text-ink">{stat.value}</p>
              </div>
              <span className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[23px] ${stat.tile}`}>
                <Icon name={stat.icon} size={28} />
              </span>
            </div>
            <p className="mt-[30px] flex items-center gap-2 text-base font-semibold whitespace-nowrap text-muted">
              <Icon name={stat.up ? "trendUp" : "trendDown"} size={20} className={`shrink-0 ${stat.up ? "text-success" : "text-fall"}`} />
              <span>
                <span className={stat.up ? "text-success" : "text-fall"}>{stat.change}</span> {stat.note}
              </span>
            </p>
          </div>
        ))}
      </div>
      <Card title="Stock Movements" action={<MonthPicker />} className="mt-[30px]">
        <LineChart values={daily} max={400} ticks={[0, 100, 200, 300, 400]} labels={["1 Oct", "5", "10", "15", "20", "25", "31 Oct"]} unit="units" />
      </Card>
      <Card title="Latest Movements" action={<MonthPicker />} className="mt-[30px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="h-12 text-sm font-bold text-ink">
                <th className="rounded-l-xl bg-panel px-4">Product</th>
                <th className="bg-panel px-4">Branch</th>
                <th className="bg-panel px-4">Date - Time</th>
                <th className="bg-panel px-4">Delta</th>
                <th className="bg-panel px-4">Balance</th>
                <th className="rounded-r-xl bg-panel px-4 text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((row) => (
                <tr key={row.time} className="h-[82px] border-b border-divider text-sm font-semibold whitespace-nowrap text-ink">
                  <td className="px-4">
                    <span className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Icon name="product" size={18} />
                      </span>
                      <span>
                        {row.name}
                        <span className="block font-mono text-xs text-muted">{row.sku}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 font-mono text-[13px]">{row.branch}</td>
                  <td className="px-4">{formatDateTime(row.time)}</td>
                  <td className={`px-4 ${row.delta < 0 ? "text-fall" : "text-success"}`}>{row.delta > 0 ? `+${row.delta}` : row.delta}</td>
                  <td className="px-4">{row.balance}</td>
                  <td className="px-4 text-center">
                    <Badge tone={movementTone[row.type]}>{titleCase(row.type)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
