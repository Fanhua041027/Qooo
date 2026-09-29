import { Input, Picker, Text, Textarea, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import type { FarmTask, UpdateTaskInput } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { formatDateTime } from '@/utils/format'
import './index.scss'

const priorityLabels: Record<FarmTask['priority'], string> = {
  LOW: '不着急',
  MEDIUM: '建议今天',
  HIGH: '优先处理'
}

function toDateInput(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10)
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10)
}

export function TaskItem({ task, onComplete, onUpdate, loading = false, updating = false }: { task: FarmTask; onComplete?: (note?: string) => void; onUpdate?: (input: UpdateTaskInput) => Promise<boolean>; loading?: boolean; updating?: boolean }) {
  const completed = task.status === 'COMPLETED'
  const cancelled = task.status === 'CANCELLED'
  const inactive = completed || cancelled
  const [note, setNote] = useState('')
  const [showNote, setShowNote] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [assignee, setAssignee] = useState(task.assignee || '')
  const [dueDate, setDueDate] = useState(toDateInput(task.dueAt))

  useEffect(() => {
    if (editing) return
    setTitle(task.title)
    setDescription(task.description || '')
    setAssignee(task.assignee || '')
    setDueDate(toDateInput(task.dueAt))
  }, [editing, task.description, task.dueAt, task.title])

  const openNote = () => {
    if (!loading) setShowNote(true)
  }
  const cancelNote = () => {
    setNote('')
    setShowNote(false)
  }
  const submitComplete = () => onComplete?.(note.trim() || undefined)
  const startEdit = () => {
    if (loading || updating) return
    setShowNote(false)
    setEditing(true)
  }
  const cancelEdit = () => {
    setTitle(task.title)
    setDescription(task.description || '')
    setAssignee(task.assignee || '')
    setDueDate(toDateInput(task.dueAt))
    setEditing(false)
  }
  const submitEdit = async () => {
    if (!onUpdate || !title.trim() || !dueDate || updating) return
    const updated = await onUpdate({ title: title.trim(), description: description.trim() || undefined, assignee: assignee.trim() || undefined, dueAt: new Date(`${dueDate}T09:00:00`).toISOString() })
    if (updated) setEditing(false)
  }
  return (
    <View className={`task-item ${inactive ? 'task-item--completed' : ''}`}>
      <View className='task-item__body'>
        <View className='task-item__top'>
          <Text className='task-item__title'>{task.title}</Text>
          <Badge tone={completed ? 'success' : cancelled ? 'neutral' : task.status === 'OVERDUE' ? 'danger' : task.priority === 'HIGH' ? 'warning' : 'neutral'}>
            {completed ? '已完成' : cancelled ? '已取消' : task.status === 'OVERDUE' ? '已逾期' : '待处理'}
          </Badge>
        </View>
        {task.description ? <Text className='task-item__description'>{task.description}</Text> : null}
        <View className='task-item__meta-row'>
          <Text className='task-item__time'>计划时间：{formatDateTime(task.dueAt)}</Text>
          {task.assignee ? <Text className='task-item__assignee'>负责人：{task.assignee}</Text> : null}
          {!inactive ? <Text className={`task-item__priority task-item__priority--${task.priority.toLowerCase()}`}>{priorityLabels[task.priority]}</Text> : null}
        </View>
        {!inactive && onComplete && showNote ? (
          <View className='task-item__note'>
            <Input className='task-item__note-input' value={note} maxlength={120} placeholder='记录处理结果（可选）' aria-label='完成备注' onInput={(event) => setNote(event.detail.value)} />
            <View className='task-item__note-actions'>
              <Button variant='ghost' disabled={loading} onClick={cancelNote}>取消</Button>
              <Button variant='secondary' loading={loading} onClick={submitComplete}>确认完成</Button>
            </View>
          </View>
        ) : null}
        {!inactive && onUpdate && editing ? (
          <View className='task-item__edit'>
            <Input className='task-item__edit-input' value={title} maxlength={80} placeholder='任务名称' aria-label='任务名称' onInput={(event) => setTitle(event.detail.value)} />
            <Textarea className='task-item__edit-textarea' value={description} maxlength={200} placeholder='补充执行说明（可选）' aria-label='任务说明' onInput={(event) => setDescription(event.detail.value)} />
            <Input className='task-item__edit-input' value={assignee} maxlength={80} placeholder='负责人（可选）' aria-label='任务负责人' onInput={(event) => setAssignee(event.detail.value)} />
            <View className='task-item__edit-date'>
              <Text>计划日期</Text>
              <Picker mode='date' value={dueDate} onChange={(event) => setDueDate(event.detail.value)}>
                <View>{dueDate}</View>
              </Picker>
            </View>
            <View className='task-item__note-actions'>
              <Button variant='ghost' disabled={updating} onClick={cancelEdit}>取消</Button>
              <Button variant='secondary' loading={updating} disabled={!title.trim() || !dueDate} onClick={submitEdit}>保存修改</Button>
            </View>
          </View>
        ) : null}
      </View>
      {!inactive && !showNote && !editing ? (
        <View className='task-item__actions'>
          {onUpdate ? <Button variant='ghost' disabled={loading || updating} ariaLabel={`编辑任务：${task.title}`} onClick={startEdit}>编辑</Button> : null}
          {onComplete ? <Button variant='secondary' loading={loading} ariaLabel={`完成任务：${task.title}`} onClick={openNote}>完成</Button> : null}
        </View>
      ) : null}
    </View>
  )
}
