
.MODEL SMALL
.CODE
START:
	MOV AX, @Data
	MOV Ds, Ax

	;Asignation
	Mov dx, offset a+2
	MOV si, dx
	MOV [si], 1
	add [si], 30h
	;Asignation
	Mov dx, offset b+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;Asignation
	Mov dx, offset c+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;Asignation
	Mov dx, offset x+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;Asignation
	Mov dx, offset y+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;Asignation
	Mov dx, offset z+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;while
	wsalto_0:
	mov si, offset a + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov bh, 0
	mov bl, 0
	add bl, 30h
	cmp al, bl
	je wsalto_1
	;Input
	MOV AH, 09h
	MOV Dx, OFFSET MSG_1
	INT 21H
	MOV AH, 0AH
	MOV DX, offset a
	INT 21h
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Input
	MOV AH, 09h
	MOV Dx, OFFSET MSG_2
	INT 21H
	MOV AH, 0AH
	MOV DX, offset b
	INT 21h
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Input
	MOV AH, 09h
	MOV Dx, OFFSET MSG_3
	INT 21H
	MOV AH, 0AH
	MOV DX, offset c
	INT 21h
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;if
	mov si, offset b + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset c + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jna salto_0
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_4
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Operation
	push ax
	push bx
	mov si, offset c + 2
	mov ah, [si]
	mov bh, 0
	add bh, 30h
	add ah, bh
	sub ah, 30h
	mov si, offset x + 2
	mov [si], ah
	pop bx
	pop ax
	;while
	wsalto_2:
	mov si, offset x + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset b + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jnbe wsalto_3
	;Operation
	push ax
	push bx
	xor ax, ax
	mov si, offset x + 2
	mov al, [si]
	sub al, 30h
	mov bh, 2
	div bh
	mov si, offset y + 2
	mov [si], ah
	add [si], 30h
	pop bx
	pop ax
	;if
	mov si, offset y + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov bh, 0
	mov bl, 0
	add bl, 30h
	cmp al, bl
	jne salto_1
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_5
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV DX, OFFSET x + 2
	MOV AH, 09h
	INT 21h
	;close_if
	salto_1:
	;Operation
	push ax
	push bx
	mov si, offset x + 2
	mov ah, [si]
	mov bh, 1
	add bh, 30h
	add ah, bh
	sub ah, 30h
	mov si, offset x + 2
	mov [si], ah
	pop bx
	pop ax
	;close_while
	jmp wsalto_2
	wsalto_3:
	;close_if
	salto_0:
	;if
	mov si, offset c + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset b + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jnae salto_2
	;if
	mov si, offset c + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset a + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jnb salto_3
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_6
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Operation
	push ax
	push bx
	mov si, offset c + 2
	mov ah, [si]
	mov bh, 0
	add bh, 30h
	add ah, bh
	sub ah, 30h
	mov si, offset x + 2
	mov [si], ah
	pop bx
	pop ax
	;while
	wsalto_4:
	mov si, offset x + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset a + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jnbe wsalto_5
	;Operation
	push ax
	push bx
	xor ax, ax
	mov si, offset x + 2
	mov al, [si]
	sub al, 30h
	mov bh, 2
	div bh
	mov si, offset y + 2
	mov [si], ah
	add [si], 30h
	pop bx
	pop ax
	;if
	mov si, offset y + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov bh, 0
	mov bl, 0
	add bl, 30h
	cmp al, bl
	je salto_4
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_7
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV DX, OFFSET x + 2
	MOV AH, 09h
	INT 21h
	;close_if
	salto_4:
	;Operation
	push ax
	push bx
	mov si, offset x + 2
	mov ah, [si]
	mov bh, 1
	add bh, 30h
	add ah, bh
	sub ah, 30h
	mov si, offset x + 2
	mov [si], ah
	pop bx
	pop ax
	;close_while
	jmp wsalto_4
	wsalto_5:
	;close_if
	salto_3:
	;close_if
	salto_2:
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_8
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	;Asignation
	Mov dx, offset z+2
	MOV si, dx
	MOV [si], 0
	add [si], 30h
	;Asignation
	Mov dx, offset c+2
	MOV si, dx
	MOV [si], 1
	add [si], 30h
	;while
	wsalto_6:
	mov si, offset z + 2
	mov ah, 0
	mov al, byte ptr [si]
	mov di, offset b + 2
	mov bh, 0
	mov Bl, byte ptr [di]
	cmp al, bl
	jnb wsalto_7
	;Operation
	push ax
	push bx
	mov si, offset c + 2
	mov al, [si]
	sub al, 30h
	mov si, offset a + 2
	mov bh, [si]
	sub bh, 30h
	mul bh
	mov si, offset c + 2
	mov [si], al
	add [si], 30h
	pop bx
	pop ax
	;Operation
	push ax
	push bx
	mov si, offset z + 2
	mov ah, [si]
	mov bh, 1
	add bh, 30h
	add ah, bh
	sub ah, 30h
	mov si, offset z + 2
	mov [si], ah
	pop bx
	pop ax
	;close_while
	jmp wsalto_6
	wsalto_7:
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV DX, OFFSET c + 2
	MOV AH, 09h
	INT 21h
	;close_while
	jmp wsalto_0
	wsalto_1:
	;Output
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_9
	INT 21H
	MOV AH, 09h
	MOV Dx, OFFSET MSG_0
	INT 21H

	MOV AX, 4C00h
	INT 21h
.DATA
	MSG_0 DB "", 10, 13, "$"
	a DB 5, ?, 5 DUP (24H)
	b DB 5, ?, 5 DUP (24H)
	c DB 5, ?, 5 DUP (24H)
	x DB 5, ?, 5 DUP (24H)
	y DB 5, ?, 5 DUP (24H)
	z DB 5, ?, 5 DUP (24H)
	MSG_1 DB "a: ", 10, 13, "$"
	MSG_2 DB "b: ", 10, 13, "$"
	MSG_3 DB "c: ", 10, 13, "$"
	MSG_4 DB "Caso 1", 10, 13, "$"
	MSG_5 DB "Par", 10, 13, "$"
	MSG_6 DB "Caso 2", 10, 13, "$"
	MSG_7 DB "Impar", 10, 13, "$"
	MSG_8 DB "Potencia", 10, 13, "$"
	MSG_9 DB "gg lenguajes y automatas 2. Easy.", 10, 13, "$"
.STACK
END START