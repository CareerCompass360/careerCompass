import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AddressFieldsProps {
  value: AddressForm;
  onChange: (value: AddressForm) => void;
}

export interface AddressForm {
  flat: string;
  area: string;
  pincode: string;
  city: string;
  state: string;
}

export function AddressFields({ value, onChange }: AddressFieldsProps) {
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  // Debounce pin code API call
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value.replace(/[^0-9]/g, '');
    onChange({ ...value, pincode, city: '', state: '' });
    setPinError(null);
    if (pincode.length === 6) {
      setPinLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          onChange({
            ...value,
            pincode,
            city: postOffice.District,
            state: postOffice.State,
          });
        } else {
          setPinError('Invalid pincode');
        }
      } catch {
        setPinError('Failed to fetch city/state');
      } finally {
        setPinLoading(false);
      }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col gap-6">
        {/* Flat/House/Street */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="flat" className="font-semibold">Flat/House No. & Street</Label>
          <Input
            id="flat"
            value={value.flat}
            onChange={e => onChange({ ...value, flat: e.target.value })}
            placeholder="Flat, House No., Building, Street"
            autoComplete="address-line1"
            className="h-11 text-base"
          />
        </div>
        {/* Area/Landmark */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="area" className="font-semibold">Area / Landmark</Label>
          <Input
            id="area"
            value={value.area}
            onChange={e => onChange({ ...value, area: e.target.value })}
            placeholder="Area, Locality, Landmark"
            autoComplete="address-line2"
            className="h-11 text-base"
          />
        </div>
        {/* Pin/City/State in a row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="pincode" className="font-semibold">Pin Code</Label>
            <Input
              id="pincode"
              value={value.pincode}
              onChange={handlePincodeChange}
              placeholder="6-digit Pincode"
              maxLength={6}
              inputMode="numeric"
              autoComplete="postal-code"
              className="h-11 text-base"
            />
            {pinLoading && <div className="text-xs text-gray-500">Checking pincode...</div>}
            {pinError && <div className="text-xs text-red-500">{pinError}</div>}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="city" className="font-semibold">City</Label>
            <Input id="city" value={value.city} readOnly placeholder="City" className="h-11 text-base bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="state" className="font-semibold">State</Label>
            <Input id="state" value={value.state} readOnly placeholder="State" className="h-11 text-base bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
