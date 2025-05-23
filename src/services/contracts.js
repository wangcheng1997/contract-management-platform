// src/services/contracts.js
import { supabase } from '../main'

// 获取所有合同
export const getContracts = async () => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// 创建合同
export const createContract = async (contract) => {
  const { data, error } = await supabase
    .from('contracts')
    .insert([contract])
    .select()
  
  if (error) throw error
  return data[0]
}

// 更新合同
export const updateContract = async (id, updates) => {
  const { data, error } = await supabase
    .from('contracts')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// 删除合同
export const deleteContract = async (id) => {
  const { error } = await supabase
    .from('contracts')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// 获取单个合同
export const getContract = async (id) => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*, payments(*)')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// 添加收款记录
export const addPayment = async (payment) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
  
  if (error) throw error
  return data[0]
}