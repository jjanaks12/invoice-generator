<script lang="ts" setup>
  import Printd from 'printd'

  interface InvoicePreviewProps {
    fields: InvoiceItem[]
    data: InvoideDetail
  }

  const props = defineProps<InvoicePreviewProps>()
  const isShowing = defineModel('show')

  const invoice = ref()

  const grandTotal = computed(() => props.fields.reduce((a, item) => a + (item.quantity * item.rate), 0))

  const downloadPDF = () => {
    const d = new Printd()
    d.print(invoice.value)
  }
</script>

<template>
  <div :class="{ 'invoice__preview': true, 'invoice__preview--show': isShowing }">
    <table style="width: 750px; height: 50vh; letter-spacing: 0.01em; font-family: Arial, Helvetica, sans-serif; margin: 0 auto 40px; background: #ededed;" ref="invoice">
      <tbody>
        <tr>
          <td colspan="3" style="height: 1%; padding: 20px 15px 0;">
            <dl style="color: #878787; margin: 0;">
              <dt style="font-weight: 700;">Date</dt>
              <dd style="margin-bottom: 5px;">{{ data.date }}</dd>
              <dt style="font-weight: 700;">Invoice no</dt>
              <dd>{{ data.invoice_no }}</dd>
            </dl>
          </td>
        </tr>
        <tr>
          <td style="height: 1%; padding: 20px 15px;">
            <span style="color: #878787; display: block; margin-bottom: 10px;">Bill From</span>
            <strong style="font-size: 1.5em;  display: block;">{{ data.from_name }}</strong>
            <em style="font-style: normal; display: block; margin-bottom: 5px;">{{ data.from_email }}</em>
            <address style="color: #878787; font-style: normal;">
              {{ data.from_address }},<br>
              {{ data.from_city }},<br>
              {{ data.from_post_code }}
            </address>
          </td>
          <td>&nbsp;</td>
          <td style="height: 1%; text-align: right; padding: 20px 15px;">
            <span style="color: #878787; display: block; margin-bottom: 10px;">Bill to</span>
            <strong style="font-size: 1.5em; display: block;">{{ data.to_name }}</strong>
            <em style="font-style: normal; display: block; margin-bottom: 5px;">{{ data.to_email }}</em>
            <address style="color: #878787; font-style: normal;">
              {{ data.to_address }},<br>
              {{ data.to_city }},<br>
              {{ data.to_post_code }}
            </address>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 0 20px;">
            <table cellpadding="0" cellspacing="0" style="width: 100%;">
              <thead>
                <tr style="text-transform: uppercase;">
                  <th
                    style="text-align: left; padding: 15px 0; border-top: 2px solid #878787; border-bottom: 2px solid #878787;">
                    Description</th>
                  <th style="padding: 15px 0; border-top: 2px solid #878787; border-bottom: 2px solid #878787;">Rate
                  </th>
                  <th style="padding: 15px 0; border-top: 2px solid #878787; border-bottom: 2px solid #878787;">QTY</th>
                  <th
                    style="text-align: right; padding: 15px 0; border-top: 2px solid #878787; border-bottom: 2px solid #878787;">
                    Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="field in fields">
                  <td style="padding: 15px 0; border-bottom: 1px solid #878787;">
                    {{ field.description }}
                    <span style="color:#878787; font-size: 90%; display: block;">{{ field.addition_detail }}</span>
                  </td>
                  <td style="text-align: center; padding: 15px 0; border-bottom: 1px solid #878787;">{{ field.rate }}
                  </td>
                  <td style="text-align: center; padding: 15px 0; border-bottom: 1px solid #878787;">{{ field.quantity
                    }}</td>
                  <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #878787;">{{ field.rate *
                    field.quantity }}</td>
                </tr>
                <tr>
                  <td style=" padding: 15px 0;"></td>
                  <td colspan="2"
                    style="text-transform: uppercase; font-weight: bold; padding: 15px 0; border-bottom: 1px solid #878787;">
                    Total</td>
                  <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #878787;">{{ data.currency }} {{ grandTotal }}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="invoice__preview__action">
      <a href="#" class="btn btn__primary btn--outline" @click.prevent="isShowing = false">&times; Close</a>
      <a href="#" class="btn btn__primary" @click.prevent="downloadPDF">Print</a>
    </div>
  </div>
</template>