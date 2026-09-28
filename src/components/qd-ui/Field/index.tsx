import { Input, Text, Textarea, View } from '@tarojs/components'
import './index.scss'

interface FieldProps {
  label: string
  value: string
  placeholder?: string
  multiline?: boolean
  maxLength?: number
  onChange: (value: string) => void
}

export function Field({ label, value, placeholder, multiline = false, maxLength, onChange }: FieldProps) {
  return (
    <View className='qd-field'>
      <Text className='qd-field__label'>{label}</Text>
      {multiline ? (
        <Textarea className='qd-field__control qd-field__textarea' value={value} placeholder={placeholder} maxlength={maxLength} aria-label={label} onInput={(event) => onChange(event.detail.value)} />
      ) : (
        <Input className='qd-field__control' value={value} placeholder={placeholder} maxlength={maxLength} aria-label={label} onInput={(event) => onChange(event.detail.value)} />
      )}
    </View>
  )
}
